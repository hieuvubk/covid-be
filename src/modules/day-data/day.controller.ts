import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { DayService } from 'src/modules/day-data/day.service';
import { Day } from 'src/models/day.schema';
import { Types } from 'mongoose';

@Controller('data')
export class DayController {
  constructor(
    private readonly DayCervice: DayService,
  ) {}

  @Post('/create')
  async create() {
    return await this.DayCervice.create();
  }

  @Get('/all')
  async getAll() {
    return await this.DayCervice.getAll();
  }

  @Get(':date')
  async getByDay(@Param('date') date: string) {
    return await this.DayCervice.getByDate(date);
  }

}
