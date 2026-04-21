import * as Icons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

interface Props extends LucideProps {
  name: string
}

export const DynamicIcon = ({ name, ...props }: Props) => {
  const Icon = Icons[name as keyof typeof Icons] as React.ComponentType<LucideProps> | undefined
  if (!Icon) return null
  return <Icon {...props} />
}
