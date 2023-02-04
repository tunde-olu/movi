export const durationConvert = (runtime) => {
  return Number.isInteger(runtime / 60)
    ? `${runtime / 60}h`
    : `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
};

export const isoLanguageConvert = (iso) => {
  let languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
  return languageNames.of(iso);
};
