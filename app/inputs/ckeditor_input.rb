class CkeditorInput < Formtastic::Inputs::TextInput

  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::JavaScriptHelper

  def input_html_options
    input_html = (options.delete(:input_html) || {})
    super.merge(input_html).merge(:rows => nil)
  end

  def to_html
    hash = input_html_options.stringify_keys
    super + javascript_tag(js_replace(hash['id'], hash))
  end

  def js_replace(dom_id, options = {})
    js_options = applay_options(options)
    js = "if (CKEDITOR.instances['#{dom_id}']) {\nCKEDITOR.remove(CKEDITOR.instances['#{dom_id}']);\n}\n"
    js_options.blank? ? js += "CKEDITOR.replace('#{dom_id}');" : js += "CKEDITOR.replace('#{dom_id}', { #{js_options} });"
  end

  def applay_options(options)
    str = []
    options.each do |key, value|
      item = case value
             when String then
               value.split(//).first == '^' ? value.slice(1..-1) : "'#{value}'"
             when Hash then
               "{ #{applay_options(value)} }"
             when Array then
               arr = value.collect { |v| "'#{v}'" }
               "[ #{arr.join(',')} ]"
             when nil then
               next
             else value
             end
      str << %Q{'#{key}': #{item}}
    end
    str.sort.join(', ')
  end

end
