using System;
using Application.Common;

namespace Application.Interfaces;

public interface IPageAssembler
{
    PageResponseDto<T> Assemble<T>(List<T> content, PageRequestDto pageRequestDto, int totalElements);
}
