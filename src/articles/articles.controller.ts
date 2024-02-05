import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/users/dto/current-user.dto';
import { UserGuard } from 'src/guards/user.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(UserGuard)
  @Get('all')
  async findAll() {
    return await this.articlesService.findAll();
  }

  @UseGuards(AdminGuard)
  @Post('add')
  async addArticle(@Body() article: CreateArticleDto) {
    return await this.articlesService.addArticle(article);
  }

  @UseGuards(AdminGuard)
  @Put('update/:id')
  async updateArticle(
    @Param('id', ParseIntPipe) articleId: number,
    @Body() articleUpdates: UpdateArticleDto,
  ) {
    return await this.articlesService.updateArticle(articleId, articleUpdates);
  }

  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  async deleteArticle(@Param('id', ParseIntPipe) articleId: number) {
    return await this.articlesService.deleteArticle(articleId);
  }

  @UseGuards(UserGuard)
  @Get('bookmarks')
  async getBookmarks(@CurrentUser() userDetails: CurrentUserDto) {
    return await this.articlesService.getBookmarks(userDetails.userId);
  }

  @Post('bookmark/:articleId')
  async bookmarkArticle(
    @CurrentUser() userDetails: CurrentUserDto,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    return await this.articlesService.bookmarkArticle(
      userDetails.userId,
      articleId,
    );
  }

  @UseGuards(UserGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) articleId: number) {
    return await this.articlesService.findArticleById(articleId);
  }
}
