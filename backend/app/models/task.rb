class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :description, type: String
  field :completed, type: Mongoid::Boolean
  field :score, type: Integer
  field :expiryTime, type: String

  belongs_to :user
end
