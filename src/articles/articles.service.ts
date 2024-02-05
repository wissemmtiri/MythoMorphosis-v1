import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepo: Repository<Article>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findAll() {
    try {
      const articles = await this.articlesRepo.find();
      if (articles) {
        return articles;
      }
      throw new HttpException('No articles found', HttpStatus.NOT_FOUND);
    } catch {
      throw new HttpException(
        'Error fetching articles',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findArticleById(articleId: number) {
    try {
      const article = await this.articlesRepo.findOne({
        where: { id: articleId },
      });
      if (article) {
        return article;
      }
      throw new HttpException(
        'Article with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    } catch {
      throw new HttpException(
        'Error fetching this article',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addArticle(article: CreateArticleDto) {
    try {
      return await this.articlesRepo.save(article);
    } catch {
      throw new HttpException('Error adding article', HttpStatus.BAD_REQUEST);
    }
  }

  async updateArticle(articleId: number, articleUpdates: UpdateArticleDto) {
    try {
      const article = await this.articlesRepo.findOne({
        where: {
          id: articleId,
        },
      });
      if (!article) {
        throw new HttpException(
          'Article with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.articlesRepo.update(articleId, articleUpdates);
    } catch {
      throw new HttpException('Error updating article', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteArticle(articleId: number) {
    try {
      const article = await this.articlesRepo.findOne({
        where: {
          id: articleId,
        },
      });
      if (!article) {
        throw new HttpException(
          'Article with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.articlesRepo.delete(articleId);
    } catch {
      throw new HttpException('Error deleting article', HttpStatus.BAD_REQUEST);
    }
  }

  async getBookmarks(userId: number) {
    try {
      const user = await this.usersRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['bookmarks'],
      });
      if (user) {
        return user.bookmarks;
      }
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching bookmarks',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async bookmarkArticle(userId: number, articleId: number) {
    try {
      const user = await this.usersRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['bookmarks'],
      });
      if (!user) {
        throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
      }
      const article = await this.articlesRepo.findOne({
        where: {
          id: articleId,
        },
      });
      if (!article) {
        throw new HttpException('Article Not Found', HttpStatus.BAD_REQUEST);
      }

      let hasArticle = false;
      user.bookmarks.forEach((bookmark) => {
        if (bookmark.id === articleId) {
          hasArticle = true;
        }
      });

      if (hasArticle) {
        user.bookmarks = user.bookmarks.filter(
          (bookmark) => bookmark.id !== articleId,
        );
        await this.usersRepo.save(user);
        return 'Article removed from bookmarks';
      } else {
        user.bookmarks.push(article);
        await this.usersRepo.save(user);
        return 'Article added to bookmarks';
      }
    } catch {
      throw new HttpException(
        'Error Bookmarking this article',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
