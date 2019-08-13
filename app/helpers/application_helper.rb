module ApplicationHelper
  def language(symbol)
    languages = {
      English: 'en',
      Português: 'pt',
      Español: 'es',
      简体中文: 'zh-CHS',
      Français: 'fr'
    }
    languages[symbol]
  end
end
