import { getQuestions, QUESTIONS } from './index';

describe('When getting questions', () => {
  it('Should return all questions when no component name provided', () => {
    const questions = getQuestions({ hasProvidedComponentName: false });
    expect(questions.length).toEqual(QUESTIONS.length);
  });

  it('Should remove first item when component name provided', () => {
    const questions = getQuestions({ hasProvidedComponentName: true });
    expect(questions.length).toEqual(QUESTIONS.length - 1);
    expect(questions[0]).toEqual(QUESTIONS[1]);
  });
});
