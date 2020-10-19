class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :description, type: String
  field :completed, type: Mongoid::Boolean
  field :expiryTime, type: Hash
  field :score, type: Integer
  belongs_to :user
end
