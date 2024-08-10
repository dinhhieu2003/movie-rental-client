import { TestBed } from '@angular/core/testing';

import { VideoStreamingService } from './video-streaming.service';

describe('VideoStreamingService', () => {
  let service: VideoStreamingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoStreamingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
