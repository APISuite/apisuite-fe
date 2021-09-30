import { useTheme, CircularProgress, Grid, Typography } from "@apisuite/fe-base";
import clsx from "clsx";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor, { theme } from "rich-markdown-editor";
import { getMarkdownPage } from "store/markdownPages/actions/getMarkdownPage";
import { debounce } from "util/debounce";

import { getPageContent } from "./selectors";
import useStyles from "./styles";
import { MarkdownProps, TOCHeader } from "./types";

export const Markdown: React.FC<MarkdownProps> = ({
  page,
  defaultValue,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { palette, typography } = useTheme();
  const { content, isRequesting, error } = useSelector(getPageContent);
  const OFFSET = 240; // 240 px is the page container top margin

  const customTheme = {
    ...theme,
    divider: palette.grey[200],
    fontFamily: typography.fontFamily || "Roboto",
    fontFamilyMono: typography.fontFamily || "SFMono-Regular",
    link: palette.info.main,
    noticeInfoBackground: palette.info.light,
    noticeInfoText: palette.info.dark,
    noticeTipBackground: palette.primary.main,
    noticeTipText: palette.primary.contrastText,
    noticeWarningBackground: palette.warning.light,
    noticeWarningText: palette.warning.dark,
    text: palette.text.primary,
  };

  const editorRef = useRef<Editor>(null);
  const [headings, setHeaders] = useState<TOCHeader[] | undefined>(undefined);
  const [elementsIds, setElements] = useState<(HTMLElement|null)[]>([]);
  const [active, setActive] = useState<string|null>(null);

  useEffect(() => {
    dispatch(getMarkdownPage({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (!isRequesting) {
      const heading = editorRef.current?.getHeadings();
      if (heading) {
        const filtered = heading.filter(h => h.level === 2);
        setHeaders(filtered);
        setElements(filtered.map((h) => document.getElementById(h.id)) || []);
      }
    }
  }, [editorRef, isRequesting]);

  const checkActiveSection = useCallback(() => {
    const buffer = 10;
    const elements = elementsIds.map((el) => ({ el, y: el?.getBoundingClientRect().top }));
    const activeEl = elements.find(({y}) => y && (y >= OFFSET - buffer && y < OFFSET + buffer));
    if (activeEl && activeEl.el) {
      setActive(activeEl.el.id);
    } else {
      let activeElement: HTMLElement | null = null, lowest = Infinity;
      for (const e of elements) {
        if (e && e.y && e.y > OFFSET - 100) {
          if (e.y < lowest) {
            lowest = e.y;
            activeElement = e.el;
          }
        }
      }
      if (activeElement) {
        setActive(activeElement.id);
      } else if (elementsIds) {
        setActive(elementsIds[elementsIds.length - 1]?.id || "");
      }
    }
  }, [elementsIds]);

  const listener = useCallback(() => {
    debounce("MARKDOWN_SCROLLSPY", () => checkActiveSection(), 100);
  }, [checkActiveSection]);

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [listener]);

  const scrollToHash = (hash: string) => {
    const element = document.getElementById(hash);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: y - OFFSET,
        behavior: "smooth",
      });
      setActive(hash);
    }
  };

  const generateSideNav = (tocHeaders: TOCHeader[] | undefined) => {
    if (tocHeaders && tocHeaders.length) {
      return <Grid item md={3}>
        <div className={classes.sideMenuContainer}>
          {tocHeaders.map((header, idx) => (
            <div
              className={classes.menuItem}
              key={`${header.id}-${idx}`}
              onClick={() => scrollToHash(header.id)}
              ref={React.createRef()}
            >
              <Typography
                className={clsx(
                  classes.item,
                  (header.id === active || (active === null && idx === 0)) && classes.selected,
                )}
                variant="body1">
                {header.title}
              </Typography>
            </div>
          ))}
        </div>
      </Grid>;
    }
    return <></>;
  };

  const getContent = (requesting: boolean) => {
    if (requesting) {
      return <CircularProgress />;
    }

    return <Editor
      readOnly
      ref={editorRef}
      theme={customTheme}
      value={error ? defaultValue : content}
    />;
  };

  return (
    <Grid container item spacing={2}>
      {generateSideNav(headings)}
      <Grid item md>{getContent(isRequesting)}</Grid>
    </Grid>
  );
};
