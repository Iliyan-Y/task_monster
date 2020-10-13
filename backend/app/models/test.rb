class Test
  include Mongoid::Document
  include Mongoid::Timestamps
  field :comment, type: String
end
