Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createPost, Mutations::CreatePost.field
end
