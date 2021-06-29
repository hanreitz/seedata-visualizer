class User < ApplicationRecord
  has_many :datasets
  has_many :visualizations, through: :datasets
end
