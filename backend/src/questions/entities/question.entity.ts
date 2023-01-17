import { ApiHideProperty } from '@nestjs/swagger';
import { Question, QuestionType } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { MultipleChoiceEntity } from '../multiple-choice/entities/multiple-choice.entity';
import { MultipleSelectEntity } from '../multiple-select/entities/multiple-select.entity';
import { ShortAnswerEntity } from '../short-answer/entities/short-answer.entity';
import { TrueFalseEntity } from '../true-false/entities/true-false.entity';

export class QuestionEntity implements Question {
    id: number;

    @Exclude()
    @ApiHideProperty()
    examId: number;
    question: string;
    description: string | null;

    @Exclude()
    type: QuestionType;

    options: string[];
    answers: number[];

    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    @ApiHideProperty()
    deletedAt: Date | null = null;
    @Exclude()
    @ApiHideProperty()
    isDeleted: boolean;


    constructor(partial: Partial<QuestionEntity>) {
        Object.assign(this, partial);
    }

    toShortAnswer(): ShortAnswerEntity {
        return {
            id: this.id,
            question: this.question,
            type: QuestionType.SHORT_ANSWER,
            description: this.description,
            answer: this.options[this.answers[0]]
        }
    }

    toMultipleChoice(): MultipleChoiceEntity {
        return {
            id: this.id,
            type: QuestionType.MULTIPLE_CHOICE,
            question: this.question,
            description: this.description,
            answer: this.answers[0],
            options: this.options
        }
    }


    toMultipleSelect(): MultipleSelectEntity {
        return {
            id: this.id,
            type: QuestionType.MULTIPLE_SELECT,
            question: this.question,
            description: this.description,
            answers: this.answers,
            options: this.options
        }
    }

    toTrueFalse(): TrueFalseEntity {
        return {
            id: this.id,
            type: QuestionType.TRUE_FALSE,
            question: this.question,
            description: this.description,
            answer: this.answers[0] === 1
        }
    }





}



