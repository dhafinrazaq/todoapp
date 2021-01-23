class Todo < ApplicationRecord
  # has_many :taggings, dependent: :destroy
  # has_many :tags, through: :taggings

  belongs_to :user
  has_many :taggings
  has_many :tags, through: :taggings

  def self.tag_user(tag_id, user_id)
    Tag.find_by!(id: tag_id).todos
    # Todo.where(user_id: user_id, tags_id: tag_id)
  end

  def self.tag_counts
    Tag.select('tags.*, count(taggings.tag_id) as count').joins(:taggings).group('taggings.tag_id')
  end

  def tag_list
    tags.map(&:name).join(', ')
  end

  def set_tag(names, user_id)
    # self.tags = Tag.where(name: name.strip, user_id: user_id).first_or_create!
    print(names)
    self.tags = names.split(',').map do |n|
      Tag.where(name: n.strip, user_id: user_id).first_or_create!
    end
  end
  # def tag_list=(names)
  #   print(names)
  #   self.tags = names.split(',').map do |n|
  #     Tag.where(name: n.strip).first_or_create!
  #   end
  # end
end
