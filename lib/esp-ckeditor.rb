require 'esp-ckeditor/engine'
require 'pathname'

module EspCkeditor

  def self.root_path
    @root_path ||= Pathname.new( File.dirname(File.expand_path('../', __FILE__)) )
  end

  def self.assets
    Dir[root_path.join('app/assets/javascripts/esp-ckeditor/**', '*.{js,css}')].inject([]) do |list, path|
      list << Pathname.new(path).relative_path_from(root_path.join('vendor/assets/javascripts'))
      list
    end
  end

end
