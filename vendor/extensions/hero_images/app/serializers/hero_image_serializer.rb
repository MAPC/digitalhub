class HeroImageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :image, :url, :description, :format
  has_one :image
end
