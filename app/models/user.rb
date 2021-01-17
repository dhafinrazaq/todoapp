class User < ApplicationRecord
  has_secure_password
    
  has_many :todos
  has_many :tags

  validates :username, :email, presence: true
end
