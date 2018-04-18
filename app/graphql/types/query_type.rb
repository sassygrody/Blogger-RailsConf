Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  # TODO: remove me
  field :testField, types.String do
    description "An example field added by the generator"
    resolve ->(obj, args, ctx) {
      "Hello World!"
    }
  end

  field :posts, Types::PostType.to_list_type do
    description "A list of all posts"
    resolve ->(obj, args, context) { Post.all }
  end

  field :post, Types::PostType do
    description "A single post by ID"
    argument :id, types.ID
    resolve ->(obj, args, context) { Post.find_by(id: args[:id]) }
  end
end
