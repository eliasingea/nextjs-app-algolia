export function cx(
  ...classNames: Array<boolean | number | string | null | undefined>
) {
  return classNames.filter(Boolean).join(' ');
}