import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

import { toastStyles } from "./toast-styles"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: toastStyles,
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
