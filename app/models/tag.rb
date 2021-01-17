class Tag < ApplicationRecord
  # has_many :taggings
  # has_many :todos, through: :taggings
  has_many :todos
  belongs_to :user
end
