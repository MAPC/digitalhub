class HeroImageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :image, :format, :descriptionl :url
end
