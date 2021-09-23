import { useTheme, CircularProgress, Grid } from "@apisuite/fe-base";
import clsx from "clsx";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor, { theme } from "rich-markdown-editor";
import { getMarkdownPage } from "store/markdownPages/actions/getMarkdownPage";
import { debounce } from "util/debounce";

import { getPageContent } from "./selectors";
import useStyles from "./styles";
import { MarkdownProps } from "./types";

export const Markdown: React.FC<MarkdownProps> = ({
  page,
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
  const [headings, setHeaders] = useState<{ title: string; level: number; id: string }[] | undefined>(undefined);
  const [elementsIds, setElements] = useState<(HTMLElement|null)[]>([]);
  const [active, setActive] = useState<string|null>(null);

  const text = `
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~
  `;

  useEffect(() => {
    dispatch(getMarkdownPage({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (!isRequesting) {
      const heading = editorRef.current?.getHeadings();
      setHeaders(heading);
      setElements(heading?.map((h) => document.getElementById(h.id)) || []);
    }
  }, [editorRef, isRequesting]);

  const checkActiveSection = useCallback(() => {
    const buffer = 10;
    const elements = elementsIds.map((el) => ({ el, y: el?.getBoundingClientRect().top }));
    const activeEl = elements.find(({y}) => {
      if (y) {
        return (y >= OFFSET - buffer && y < OFFSET + buffer);
      }
      return false;
    });
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

  const generateSideNav = () => {
    if (headings) {
      return <Grid item md={3}>
        <div className={classes.sideMenuContainer}>
          {headings.map((header, idx) => (
            <div
              className={clsx(
                classes.menuItem,
                (header.id === active || (active === null && idx === 0)) && classes.selected,
              )}
              key={`${header.id}-${idx}`}
              onClick={() => scrollToHash(header.id)}
              ref={React.createRef()}
            >
              {header.title}
            </div>
          ))}
        </div>
      </Grid>;
    }
    return <></>;
  };

  const getContent = () => {
    if (isRequesting) {
      return <CircularProgress />;
    }

    return <Editor
      readOnly
      ref={editorRef}
      theme={customTheme}
      value={error ? text : content}
    />;
  };

  return (
    <Grid container item spacing={2}>
      {generateSideNav()}
      <Grid item md>{getContent()}</Grid>
    </Grid>
  );
};