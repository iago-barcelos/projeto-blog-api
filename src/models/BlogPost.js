module.exports = (sequelize, DataTypes) => {
	const BlogPost = sequelize.define('BlogPost',
	  {
		id: { 
		  type: DataTypes.INTEGER, 
		  primaryKey: true,
		  autoIncrement: true,
		},
		  title: DataTypes.STRING,
		  content: DataTypes.STRING,
		  userId: {
			type: DataTypes.INTEGER,
			references: { model: 'User', key: 'id' }
		},
		  published: DataTypes.DATE,
		  updated: DataTypes.DATE,
	  },
	  {
		createdAt: 'published',
		updatedAt: 'updated',
		underscored: true,
		tableName: 'blog_posts',
	  },
	);

	BlogPost.associate = (models) => {
		BlogPost.belongsTo(models.User,
		  { foreignKey: 'userId' , as: 'user' });
		BlogPost.belongsToMany(models.Category, {
		  as: 'categories',
      	  through: 'PostCategory',
      	  foreignKey: 'post_id',
          otherKey: 'category_id',
		})
	};


	return BlogPost;
};