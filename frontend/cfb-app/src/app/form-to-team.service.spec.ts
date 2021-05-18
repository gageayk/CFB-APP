import { TestBed } from '@angular/core/testing';

import { FormToTeamService } from './form-to-team.service';

describe('FormToTeamService', () => {
  let service: FormToTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormToTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
