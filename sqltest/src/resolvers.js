const resolvers = {
  Query: {
    async pilots(root, { id }, { models }) {
      return models.Pilot.findByPk(id);
    },
  },
};

module.exports = resolvers;
