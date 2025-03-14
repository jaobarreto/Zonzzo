// eslint-disable-next-line prettier/prettier
import {  Controller, Get,  Post,  Body,  Patch, Param,  Delete, UseGuards} from '@nestjs/common';
import { SleepFeedbackService } from './sleep-feedback.service';
import { CreateSleepFeedbackDto } from './dto/create-sleep-feedback.dto';
import { UpdateSleepFeedbackDto } from './dto/update-sleep-feedback.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sleep-feedback')
export class SleepFeedbackController {
  constructor(private readonly sleepFeedbackService: SleepFeedbackService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createSleepFeedbackDto: CreateSleepFeedbackDto) {
    return this.sleepFeedbackService.create(createSleepFeedbackDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.sleepFeedbackService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sleepFeedbackService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSleepFeedbackDto: UpdateSleepFeedbackDto,
  ) {
    return this.sleepFeedbackService.update(id, updateSleepFeedbackDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sleepFeedbackService.remove(id);
  }
}
