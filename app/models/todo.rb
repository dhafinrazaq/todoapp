class Todo < ApplicationRecord
  # has_many :taggings, dependent: :destroy
  # has_many :tags, through: :taggings

  belongs_to :user
  belongs_to :tag

  def self.tag_user(tag_id, user_id)
    Todo.where(user_id: user_id, tag_id: tag_id)
  end

  def self.tag_counts
    Tag.select('tags.*, count(taggings.tag_id) as count').joins(:taggings).group('taggings.tag_id')
  end

  def tag_list
    tags.map(&:name).join(', ')
  end

  def set_tag(name, user_id)
    self.tag = Tag.where(name: name.strip, user_id: user_id).first_or_create!
  end
end
