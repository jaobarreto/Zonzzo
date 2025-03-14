// eslint-disable-next-line prettier/prettier
import {  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { WakeSessionService } from './wake-session.service';
import { CreateWakeSessionDto } from './dto/create-wake-session.dto';
import { UpdateWakeSessionDto } from './dto/update-wake-session.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('wake-session')
export class WakeSessionController {
  constructor(private readonly wakeSessionService: WakeSessionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createWakeSessionDto: CreateWakeSessionDto) {
    return this.wakeSessionService.create(createWakeSessionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.wakeSessionService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wakeSessionService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWakeSessionDto: UpdateWakeSessionDto,
  ) {
    return this.wakeSessionService.update(id, updateWakeSessionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wakeSessionService.remove(id);
  }
}
