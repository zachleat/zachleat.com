module Jekyll
  module RSSURLFilter
    def relative_urls_to_absolute(input)
      url = "http://www.zachleat.com"
      input.gsub('src="/', 'src="' + url + '/').gsub('href="/', 'href="' + url + '/')
    end
  end
end

Liquid::Template.register_filter(Jekyll::RSSURLFilter)