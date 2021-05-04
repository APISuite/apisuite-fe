export type GreetingCardProps = {
  // Expecting either a string, or a paragraph
  greetingCardText: string | JSX.Element,
  // Either provide an action to the greeting card's button, (...)
  greetingCardButtonAction?: () => void,
  greetingCardButtonClassName?: string,
  greetingCardButtonLabel: string,
  // (...) or a link to some place
  greetingCardButtonLink?: string,
}
