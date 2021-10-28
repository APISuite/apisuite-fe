import React from "react";
import { useTheme } from "@apisuite/fe-base";
import Editor, { theme } from "rich-markdown-editor";

import { MarkdownDisplayerProps } from "./types";

export const MarkdownDisplayer: React.FC<MarkdownDisplayerProps> = ({
  content,
}) => {
  const { palette, typography } = useTheme();

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

  return <Editor defaultValue={content} readOnly theme={customTheme} />;
};
