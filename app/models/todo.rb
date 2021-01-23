class Todo < ApplicationRecord
  # has_many :taggings, 
  # has_many :tags, through: :taggings

  before_destroy :clean_up_tags
  belongs_to :user
  has_many :taggings, dependent: :destroy
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
    self.tags = names.split(',').map do |n|
      Tag.where(name: n.strip, user_id: user_id).first_or_create!
    end
  end

  protected

  def clean_up_tags
    print "cleaning up tags\n"
    print "above\n"
    print tag_list
    print "aboveeee\n"
    self.tags.each do |tag|
      print "inside map\n"
      print tag.todos.count
      print "\n"
      if tag.todos.count == 1
        print "destroying\n"
        tag.destroy
      end
    end
  end
end
