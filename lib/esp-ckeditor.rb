require 'esp-ckeditor/engine'
require 'pathname'

module EspCkeditor

  def self.root_path
    @root_path ||= Pathname.new( File.dirname(File.expand_path('../', __FILE__)) )
  end

  def self.assets
    Dir[root_path.join('vendor/assets/javascripts/esp-ckeditor/**', '*.{css,js,png}')].inject([]) do |list, path|
      list << Pathname.new(path).relative_path_from(root_path.join('vendor/assets/javascripts')) unless path.match('_source')
      list
    end
  end

end
