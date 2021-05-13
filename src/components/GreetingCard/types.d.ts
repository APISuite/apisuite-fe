export type GreetingCardProps = {
  // Expecting either a string, or a paragraph
  greetingCardText: string | JSX.Element,
  greetingCardButtonLabel: string,
  // (...) or a link to some place
  greetingCardButtonLink: string,
}
