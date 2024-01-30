const locale = navigator.language;
let inputFormat;

export default function dateFormat() {
  if (locale === "en-GB" || locale === "es-ES") {
    inputFormat = "dd/MM/yyyy";
  } else {
    inputFormat = "MM/dd/yyyy";
  }

  return inputFormat;
}
