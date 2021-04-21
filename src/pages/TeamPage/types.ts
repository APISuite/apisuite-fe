import { mapDispatchToProps, mapStateToProps } from './index'

export type TeamPageProps =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>
