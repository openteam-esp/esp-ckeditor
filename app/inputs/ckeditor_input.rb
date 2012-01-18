class CkeditorInput < Formtastic::Inputs::TextInput

  def input_html_options
    super.merge(:class => 'ckeditor')
  end

end
