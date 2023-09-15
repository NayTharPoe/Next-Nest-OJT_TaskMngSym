import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { Query } from 'express-serve-static-core';
import { ProjectDocument } from '../entities/project.entity';
import { CreateProjectRequestDto } from '../use-case/create/create.request.dto';
import { UpdateProjectRequestDto } from '../use-case/update/update.request.dto';
import { PaginationRequestDto } from 'src/common/dtos/request/pagination.req.dto';
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('project')
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  // create service
  async create(
    createProjectDto: CreateProjectRequestDto,
  ): Promise<ProjectDocument> {
    const newProject = new this.projectModel(createProjectDto);
    return await newProject.save();
  }

  // find service
  async findAll({ page, limit }: PaginationRequestDto): Promise<{
    projects: ProjectDocument[];
    totalProjects: number;
  }> {
    const totalProjects = await this.projectModel.countDocuments();

    const projects: any = await this.projectModel
      .find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 })
      .select('-__v');

    return { projects, totalProjects };
  }

  // find one service
  async findOne(id: string): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException(
        'There is no project with this id to retrieve',
      );
    }

    return project;
  }

  // update service
  async update(
    id: string,
    updateProjectDto: UpdateProjectRequestDto,
  ): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException('There is no project with this id to update');
    }

    return await this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  // delete service
  async remove(id: string): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException('There is no project with this id to delete');
    }

    return await this.projectModel.findByIdAndDelete(id);
  }
}
