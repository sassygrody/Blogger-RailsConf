Types::PostType = GraphQL::ObjectType.define do
  name "Post"
  field :content, types.String
  field :title, types.String
  field :id, types.ID
end
