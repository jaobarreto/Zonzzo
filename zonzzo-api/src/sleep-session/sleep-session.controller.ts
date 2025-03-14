// eslint-disable-next-line prettier/prettier
import {  Controller,  Get, Post,  Body,  Patch,  Param,  Delete, UseGuards} from '@nestjs/common';
import { SleepSessionService } from './sleep-session.service';
import { CreateSleepSessionDto } from './dto/create-sleep-session.dto';
import { UpdateSleepSessionDto } from './dto/update-sleep-session.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sleep-session')
export class SleepSessionController {
  constructor(private readonly sleepSessionService: SleepSessionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createSleepSessionDto: CreateSleepSessionDto) {
    return this.sleepSessionService.create(createSleepSessionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.sleepSessionService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sleepSessionService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSleepSessionDto: UpdateSleepSessionDto,
  ) {
    return this.sleepSessionService.update(id, updateSleepSessionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sleepSessionService.remove(id);
  }
}
