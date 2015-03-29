class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :project

  validates :name, presence: true
  validates :deadline, presence: true

  def done?
    self.done
  end

  def done!
    self.done = true
    save!
  end
end
