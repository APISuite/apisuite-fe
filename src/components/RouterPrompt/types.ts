export interface RouterPromptProps {
  bodyText: string,
  cancelText: string,
  okText: string,
  title: string,
  subtitle: string,
  type: "info" | "warning" | "error",
  when: boolean,
}
