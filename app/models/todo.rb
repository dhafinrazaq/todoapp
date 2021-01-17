class Todo < ApplicationRecord
  # has_many :taggings, dependent: :destroy
  # has_many :tags, through: :taggings

  belongs_to :user
  belongs_to :tag
  
  def self.tagged_with(name)
    Tag.find_by!(name: name).todos
  end

  def self.tag_user(tag_id, user_id)
    Todo.where(user_id: user_id, tag_id: tag_id)
    # Tag.find_by!(name: tag_name).todos.find_by(user_id: user_id)
  end

  def self.tag_counts
    Tag.select('tags.*, count(taggings.tag_id) as count').joins(:taggings).group('taggings.tag_id')
  end

  def tag_list
    tags.map(&:name).join(', ')
  end

  def tag_list=(name)
    self.tag = Tag.where(name: name.strip).first_or_create!
  end
end
