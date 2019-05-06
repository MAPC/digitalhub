require 'refinerycms-core'

module Refinery
  autoload :WeighInPromptsGenerator, 'generators/refinery/weigh_in_prompts_generator'

  module WeighInPrompts
    require 'refinery/weigh_in_prompts/engine'

    class << self
      attr_writer :root

      def root
        @root ||= Pathname.new(File.expand_path('../../../', __FILE__))
      end

      def factory_paths
        @factory_paths ||= [ root.join('spec', 'factories').to_s ]
      end
    end
  end
end
