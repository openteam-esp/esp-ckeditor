module EspCkeditor
  class InstallConfigGenerator < Rails::Generators::Base
    desc 'Copy example config.js'
    source_root File.expand_path('../templates', __FILE__)

    def copy_config
      copy_file 'config.js', 'vendor/assets/javascripts/esp-ckeditor/config.js'
    end
  end
end
