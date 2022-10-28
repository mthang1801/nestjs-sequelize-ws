import {
  Controller,
  Get,
  Render,
  Res,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';



@Controller()
@ApiTags('Home')
export class HomeController {
  @Version(VERSION_NEUTRAL)
  @Get()
  @Render('home.hbs')
  get(@Res() res: Response){
    const message = `OMS API, ${new Date().toLocaleDateString('vn')}`;
    return {
		message
	}
  }
}
