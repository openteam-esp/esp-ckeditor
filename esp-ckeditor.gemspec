$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'esp-ckeditor/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'esp-ckeditor'
  s.version     = EspCkeditor::VERSION
  s.authors     = ['Evgeny Lapin']
  s.email       = ['mail@openteam.ru']
  s.homepage    = 'http://github.com/openteam-esp/esp-ckeditor'
  s.summary     = 'EspCkeditor.'
  s.description = 'EspCkeditor.'

  s.files = Dir['{app,config,db,lib}/**/*'] + ['MIT-LICENSE', 'Rakefile', 'README.rdoc']

  s.add_development_dependency 'rails', '~> 3.2.15'
  s.add_development_dependency 'juicer'
  s.add_development_dependency 'sass-rails'

end
