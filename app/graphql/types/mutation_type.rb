Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :deletePost, Mutations::DeletePost.field
  field :createPost, Mutations::CreatePost.field
end
