class HeroImageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :image, :url, :description, :format
end